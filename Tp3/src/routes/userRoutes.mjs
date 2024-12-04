import { Router } from 'express';

const router = Router();


//lista simulada de usuarios

const users = [
    {id:1, name:'Alice', age:32},
    {id:2, name:'Joe', age:33},
    {id:3, name:'Charlie', age:34},
];

//Ruta para usuarios 

router.get('/', (req, res) => {
    res.render('users', { users });
})

//Ruta para mostrar el perfil de un usuario especifico

router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(user){;
        res.render('userProfile', { user });
    }else{ 
        res.status(404).send('User not found');
    }
});

export default router;
