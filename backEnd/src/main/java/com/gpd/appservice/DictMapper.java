package com.gpd.appservice;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DictMapper {
    List<DictType> listAllDictTypes();
    List<DictItem> listAllDictItemsByType(String dictType);
}
