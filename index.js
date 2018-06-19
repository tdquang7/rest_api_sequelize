var restify = require('restify')
var server = restify.createServer()
const restifyBodyParser = require('restify-plugins').bodyParser;
server.use(restifyBodyParser());
var {User} = require('./models/index')
var { postgraphile } = require('postgraphile')

server.get('/', (req, res, next) => {
    res.send({
        data: 'Server is ready'
    })
})

server.pre(postgraphile(
	'http://postgres:123@localhost:5432/postgres',
	'public', {
    graphiql: true,
    pgDefaultRole: 'postgres',
}))

var users = [
    { name: 'Cao Đức Minh', email: "cdminh@gmail.com"},
    { name: 'Trần Hữu Phát', email: "thphat@gmail.com"}
]

server.get('/users', async (req, res, next) => {
     res.send({
        data: await User.findAll({attributes: ['id', 'name', 'email']})
     })
})

server.get('/users/:id', async (req, res, next) => {
    res.send({
        //data: users[req.params.id]
        data: await User.findOne({
            where: {id: req.params.id}
        })
    })
})

server.del('/users/:id', async (req, res, next) => {
    //users.splice(req.params.id, 1)
    await User.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send({
        message: `Người dùng id ${req.params.id} đã bị xóa`,
        //remains: users
        remains: await User.findAll({})
    })
})

server.post('/users/:id', async (req, res, next) => {
    var i = req.params.id
    var name = req.body.name;
    var email = req.body.email
    //users[i].name = name
    //users[i].email = email

    await User.update({
       name: name,
       email: email 
    }, { where: { id: i }}
    )

    res.send({
        message: `Người dùng id ${i} đã được cập nhật`,
        newData: await User.findById(i)
    })
})

server.post('/users', async (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    //users.push({name: name, email: email})
    var newUser = await User.create({name: name, email: email})
    res.send({
        message: 'Thêm mới người dùng thành công',
        new: await User.findById(newUser.id)
    })
})

server.listen(8081, () => {
    console.log('Server is listening at 8081')
})

