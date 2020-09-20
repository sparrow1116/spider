const butaolu = require('./butaolu/index');
const yangmaoduo = require('./yangmaoduo/index');
const haoyangmao8 = require('./haoyangmao8/index');
const jiuaiyangmao = require('./jiuaiyangmao/index')

async function main (){
    await yangmaoduo()
    await butaolu()
    await haoyangmao8()
    await jiuaiyangmao()
}

main()