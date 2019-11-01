package com.gpd.appservice;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.serializer.ValueFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@ResponseBody
public class UserController2 {
    @Autowired
    UserMapper userMapper;

    @RequestMapping(value = "/users/{userId}",method = RequestMethod.GET)
    public String getUserInfo(@PathVariable("userId") Integer userId){
        User user=userMapper.queryUserById(userId);
        return JSON.toJSONString(user, SerializerFeature.BrowserCompatible,SerializerFeature.UseISO8601DateFormat);
    }

    @RequestMapping(value = "/users",method = RequestMethod.POST)
    public String createUser(@RequestBody String userStr){
        JSONObject jsonObject =JSONObject.parseObject(userStr);
        User user=new User();
        user.setUsername(jsonObject.getString("username"));
        user.setAddress(jsonObject.getString("address"));
        user.setBirthday(jsonObject.getDate("birthday"));
        user.setSex(jsonObject.getString("sex"));
        userMapper.saveUser(user);
        return "success";
    }

    @RequestMapping(value = "/users",method = RequestMethod.GET)
    public String listUsers(){
        List<User> userList=userMapper.listAllUsers();
        return JSON.toJSONString(userList,SerializerFeature.BrowserCompatible,SerializerFeature.UseISO8601DateFormat,SerializerFeature.WriteMapNullValue);
    }

    @RequestMapping(value = "/users/{userId}",method = RequestMethod.PUT)
    public String updateUser(@PathVariable("userId") Integer userId,@RequestBody String userStr){
        JSONObject jsonObject =JSONObject.parseObject(userStr);
        User user=new User();
        user.setId(userId);
        user.setUsername(jsonObject.getString("username"));
        user.setAddress(jsonObject.getString("address"));
        user.setBirthday(jsonObject.getDate("birthday"));
        user.setSex(jsonObject.getString("sex"));
        userMapper.updateUser(user);
        return JSON.toJSONString(user, SerializerFeature.BrowserCompatible,SerializerFeature.UseISO8601DateFormat,SerializerFeature.WriteNullStringAsEmpty);
    }

    @RequestMapping(value = "/users/{userId}",method = RequestMethod.DELETE)
    public String deleteUser(@PathVariable("userId") Integer userId){
        userMapper.deleteUser(userId);
        return "success";
    }
}
