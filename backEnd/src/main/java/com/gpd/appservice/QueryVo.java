package com.gpd.appservice;

import lombok.Data;

@Data
public class QueryVo {
    private String custName;
    private Integer custSource;
    private Integer custIndustry;
    private Integer custLevel;

    private Integer page=1;
    private Integer start;
    private Integer rows=10;
}
