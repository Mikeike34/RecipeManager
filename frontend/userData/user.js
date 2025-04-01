
import {create} from 'zustand';

//Global state for our functions.

export const useUserData = create((set) => ({
    users:[],
    setUsers:(users) => set({ users }),

    //function for creating a user in the database
    createUser: async(newUser) => {
        if(!newUser.username || !newUser.password){
            return {success: false, message: 'Please Provide All Fields.'}
        }
        try{
        const res = await fetch("http://localhost:5000/api/users/register", {
            method: 'POST', //method for the database
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        if(!res.ok){
            throw new Error(`HTTP error. Status: ${res.status}`);
        }

        const data = await res.json().catch(()=> { //allows us to extract newUser data
            throw new Error("Invalid JSON response from server");
        });

    
        set((state) => ({users:[...state.users, data.data]}))
        return {success:true, message: "User Registered."};
        
        }catch(error){
            console.error("error in creating user: ", error.message);
            return{success:false, message: "server error"};
        }
    },

    //function for logging in an existing user
    checkUser: async(user) =>{
        
        if(!user.username || !user.password){
            return {success: false, message: 'Please Provide All Fields.'}
        }
        try{
            const res = await fetch("http://localhost:5000/api/users/login", { //running the userLogin function that we see in our userRoutes file
                method: 'POST', //method for the database
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if(!res.ok){
                throw new Error(`HTTP error. Status: ${res.status}`);
            }

            const data = await res.json();
            return {success: true, data};

        }catch(error){
            console.error(error);
            return {success: false, message: error.message};
        }
    }
}));