import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'

Mock.mock('/mock/floor',{
    data:floor,
    code:200
})
Mock.mock('/mock/banner',{
    data:banner,
    code:200
})