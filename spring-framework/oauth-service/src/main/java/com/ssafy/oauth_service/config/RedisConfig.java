package com.ssafy.oauth_service.config;

import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettucePoolingClientConfiguration;
import org.springframework.data.redis.core.RedisTemplate;

import java.time.Duration;

@Configuration
public class RedisConfig {

    @Value("${spring.data.redis.host}")
    private String host;

    @Value("${spring.data.redis.port}")
    private int port;

    @Value("${spring.data.redis.password}")
    private String password;

    @Value("${spring.redis.lettuce.pool.max-idle:10}")
    private int maxIdle;

    @Value("${spring.redis.lettuce.pool.max-total:10}")
    private int maxTotal;

    @Value("${spring.redis.lettuce.pool.min-idle:5}")
    private int minIdle;

    @Value("${spring.redis.lettuce.pool.time-between-eviction-runs:10}")
    private int timeBetweenEvictionRuns;

    @Value("${spring.redis.lettuce.pool.commandTimeout:5}")
    private long commandTimeout;

    @Value("${spring.redis.timeout:60}")
    private int  redisTimeOut;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        GenericObjectPoolConfig genericObjectPoolConfig = new GenericObjectPoolConfig();

        redisStandaloneConfiguration.setHostName(host);
        redisStandaloneConfiguration.setPort(port);
        redisStandaloneConfiguration.setPassword(password);

        genericObjectPoolConfig.setMaxIdle(maxIdle);
        genericObjectPoolConfig.setMaxTotal(maxTotal);
        genericObjectPoolConfig.setMinIdle(minIdle);
        genericObjectPoolConfig.setTimeBetweenEvictionRunsMillis(timeBetweenEvictionRuns);

        LettuceClientConfiguration lettuceClientConfiguration =
                LettucePoolingClientConfiguration.builder().poolConfig(genericObjectPoolConfig)
                        .commandTimeout(Duration.ofSeconds(commandTimeout)).build();

        return new LettuceConnectionFactory(redisStandaloneConfiguration, lettuceClientConfiguration);
    }

    @Bean
    public RedisTemplate<?, ?> redisTemplate() {
        RedisTemplate<byte[], byte[]> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        return redisTemplate;
    }
}
