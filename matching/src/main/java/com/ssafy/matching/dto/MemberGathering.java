package com.ssafy.matching.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

@ApiModel(value = "MemberGathering : 운동 모임 멤버 정보", description = "운동 모임의 멤버를 나타낸다.")

@SuppressWarnings("serial")
@Entity
public class MemberGathering implements Serializable {
    @ApiModelProperty(value = "운동 모임-멤버 아이디")
    @Id
    private int memberGatheringId;
    @ApiModelProperty(value = "운동 모임 번호")
    private int gatheringId;
    @ApiModelProperty(value = "멤버의 아이디")
    private int memberId;

    @ManyToOne
    @JoinColumn(name = "memberId", insertable=false, updatable=false)
    private Member member;
}
