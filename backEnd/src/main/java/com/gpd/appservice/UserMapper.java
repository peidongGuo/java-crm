package com.gpd.appservice;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    User queryUserById(int id);

    List<User> queryUsersByName(String username);

    List<User> listAllUsers();

    void updateUser(User user);

    void saveUser(User user);

    void deleteUser(int userId);
}
