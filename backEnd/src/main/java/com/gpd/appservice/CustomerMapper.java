package com.gpd.appservice;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CustomerMapper {
    Customer queryCustomerById(int id);

    List<Customer> queryCustomersByQueryVo(QueryVo queryVo);

    int queryCustomersByQueryVoCount(QueryVo queryVo);

    void updateCustomer(Customer customer);

    void saveCustomer(Customer customer);

    void deleteCustomer(int customerId);
}
