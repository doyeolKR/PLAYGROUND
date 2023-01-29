package com.ssafy.matching.service;

import com.ssafy.matching.dto.Gathering;

import java.util.List;

public interface GatheringService {
    List<Gathering> findAll();
    List<Gathering> findGatheringsByMyLocation(float latX, float latY);

    Gathering getByGatheringId(int gatheringId);

    void registerGathering(Gathering gathering);
    void updateGathering(Gathering gathering);
    void deleteGathering(int gatheringId);
}
