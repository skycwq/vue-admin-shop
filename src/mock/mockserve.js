import Mock from 'mockjs'
import banners from '@/mock/banner.json'
import floors from '@/mock/floor.json'


Mock.mock('/mock/banners',{
    code:200,
    data:banners
})
Mock.mock('/mock/floors',{
    code:200,
    data:floors
})