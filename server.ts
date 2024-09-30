import express from "express";

import {Request, Response, Router} from "express"

const port = 3000;
const app = express();
const  routes = Router();

app.use(express.json());

type UserAccount = {
    name: string;
    email: string;
    password: string;
    birthdate: string;
}
type Event = {
    EventName: string;
}

let EventDataBase: Event[] = [];

let UserAccountDataBase: UserAccount[] = [];

function addNewEvent(ev: Event){
    EventDataBase.push(ev);
    return EventDataBase.length;
}

function addNewUserAccount(ua: UserAccount){
    UserAccountDataBase.push(ua);
    return UserAccountDataBase.length;
}


routes.put("/singUp", (req: Request, res: Response) =>{
    const pname = req.get('name');
    const pemail = req.get('email');
    const ppassword = req.get('password');
    const pbirthdate = req.get('birthdate');
     


    if(pname && pemail && ppassword && pbirthdate){
        const newAccount: UserAccount = {
            name: pname,
            email: pemail,
            password: ppassword,
            birthdate: pbirthdate

        }

        const id = addNewUserAccount(newAccount);
        res.send(`Nova conta cadastrada. Código: ${id}`);
    }else{
        res.send("Estão faltando uma requisição");
    }
});


routes.put("/addNewEvent", (req: Request, res: Response) =>{
    const pEventname = req.get('EventName');
    if(pEventname){
        const newEvent: Event = {
        EventName: pEventname
    }
    const id_e = addNewEvent(newEvent);
    res.send(`Novo evento cadastrado ${id_e}`);
    }
    res.send("Parece que deu certo parte2")
});
routes.post("/addNewEvent", (req: Request, res: Response) =>{
    EventDataBase.push(req.body);
    res.send("Parece que deu certo")
});

routes.get("/addNewEvent", (req: Request, res: Response) =>{
     res.json(EventDataBase);
});


routes.post("/getAllAccounts", (req: Request, res: Response) =>{
     UserAccountDataBase.push(req.body);
     res.send("Parece que deu certo")
});

routes.get("/getAllAccounts", (req: Request, res: Response) =>{

    res.json(UserAccountDataBase)

});


app.use(routes);

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})