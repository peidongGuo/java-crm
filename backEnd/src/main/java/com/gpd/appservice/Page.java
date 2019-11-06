package com.gpd.appservice;

import lombok.Data;

import java.util.List;

@Data
public class Page<T> {
    private Integer total;
    private Integer pageNo;
    private Integer pageSize;
    private List<T> content;

    public Page(Integer total,Integer pageNo, Integer pageSize, List<T> content){
        this.total=total;
        this.pageNo=pageNo;
        this.pageSize=pageSize;
        this.content=content;
    }
}
