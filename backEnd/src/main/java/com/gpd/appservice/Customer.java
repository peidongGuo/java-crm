package com.gpd.appservice;

import lombok.Data;

@Data
public class Customer {
    private int id;
    private String name;
    private int sourceId;
    private String sourceName;
    private int industryId;
    private String industryName;
    private int level;
    private String levelName;
    private String phone;
    private String mobile;
}
