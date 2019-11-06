package com.gpd.appservice;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@ResponseBody
public class CustomerController {
    @Autowired
    CustomerMapper customerMapper;

    @RequestMapping(value="/customers",method = RequestMethod.POST)
    public String createCustomer(@RequestBody String customerStr){
        JSONObject jsonObject =JSONObject.parseObject(customerStr);
        Customer customer=new Customer();
        customer.setName(jsonObject.getString("name"));
        customer.setIndustryId(jsonObject.getInteger("industryId"));
        customer.setSourceId(jsonObject.getInteger("sourceId"));
        customer.setLevel(jsonObject.getInteger("level"));
        customer.setMobile(jsonObject.getString("mobile"));
        customer.setPhone(jsonObject.getString("phone"));

        // TODO 想返回成功创建的客户信息，包括客户ID
        customerMapper.saveCustomer(customer);

        return JSON.toJSONString(customer, SerializerFeature.BrowserCompatible,SerializerFeature.UseISO8601DateFormat,SerializerFeature.WriteMapNullValue);

    }

    @RequestMapping(value="/customers",method=RequestMethod.GET)
    public String queryCustomers(@RequestParam(value="industryId",required = false) Integer industryId,
                                 @RequestParam(value="name",required = false) String name,
                                 @RequestParam(value="sourceId",required = false) Integer sourceId,
                                 @RequestParam(value="level",required = false) Integer level,
                                 @RequestParam(value="page",required = false) Integer pageNo,
                                 @RequestParam(value="perPage",required = false) Integer pageSize){
        QueryVo queryVo=new QueryVo();
        queryVo.setCustIndustry(industryId);
        queryVo.setCustName(name);
        queryVo.setCustSource(sourceId);
        queryVo.setCustLevel(level);
        if(pageNo!=null){
            queryVo.setPage(pageNo);
            pageSize=pageSize!=null?pageSize:10;
            queryVo.setRows(pageSize);
            queryVo.setStart((pageNo-1)*pageSize);
        }

        List<Customer> customerList=customerMapper.queryCustomersByQueryVo(queryVo);
        int total=customerMapper.queryCustomersByQueryVoCount(queryVo);
        Page<Customer> pagedCustomers=new Page<Customer>(total,queryVo.getPage(),queryVo.getRows(),customerList);
        return JSON.toJSONString(pagedCustomers, SerializerFeature.BrowserCompatible,SerializerFeature.UseISO8601DateFormat,SerializerFeature.WriteMapNullValue);
    }

    @RequestMapping(value="/customers/{customerId}",method = RequestMethod.GET)
    public String getCustomer(@PathVariable int customerId){
        Customer customer=customerMapper.queryCustomerById(customerId);
        return JSON.toJSONString(customer, SerializerFeature.BrowserCompatible,SerializerFeature.UseISO8601DateFormat,SerializerFeature.WriteMapNullValue);
    }

    @RequestMapping(value="/customers/{customerId}",method=RequestMethod.PUT)
    public String updateCustomer(@PathVariable int customerId,@RequestBody String customerStr){
        JSONObject jsonObject=JSONObject.parseObject(customerStr);
        Customer customer=new Customer();
        customer.setId(customerId);
        customer.setName(jsonObject.getString("name"));
        customer.setIndustryId(jsonObject.getInteger("industryId"));
        customer.setSourceId(jsonObject.getInteger("sourceId"));
        customer.setLevel(jsonObject.getInteger("level"));
        customer.setMobile(jsonObject.getString("mobile"));
        customer.setPhone(jsonObject.getString("phone"));
        customerMapper.updateCustomer(customer);
        return "success";
    }

    @RequestMapping(value="/customers/{customerId}",method=RequestMethod.DELETE)
    public String deleteCustomer(@PathVariable int customerId){
        customerMapper.deleteCustomer(customerId);
        return "success";
    }

}
