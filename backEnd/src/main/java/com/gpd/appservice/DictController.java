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
public class DictController {
    @Autowired
    DictMapper dictMapper;

    @RequestMapping(value="/dictTypes",method=RequestMethod.GET)
    public String listDictTypes(){
        List<DictType> dictTypes=dictMapper.listAllDictTypes();
        String result= JSON.toJSONString(dictTypes, SerializerFeature.BrowserCompatible,SerializerFeature.UseISO8601DateFormat,SerializerFeature.WriteMapNullValue);
        return result;
    }

    @RequestMapping(value="/dictTypes/{dictTypeCode}/dictItems",method=RequestMethod.GET)
    public String listDictTypes(@PathVariable(value = "dictTypeCode") String dictTypeCode){
        List<DictItem> dictItems=dictMapper.listAllDictItemsByType(dictTypeCode);
        return JSON.toJSONString(dictItems, SerializerFeature.BrowserCompatible,SerializerFeature.UseISO8601DateFormat,SerializerFeature.WriteMapNullValue);
    }
}
