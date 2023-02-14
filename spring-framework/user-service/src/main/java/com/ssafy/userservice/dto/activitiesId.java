package com.ssafy.userservice.dto;

import lombok.*;

import java.io.Serializable;

@Builder
@Getter @Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class activitiesId implements Serializable {
    private long memberSometimes;
    private String activity;
}
