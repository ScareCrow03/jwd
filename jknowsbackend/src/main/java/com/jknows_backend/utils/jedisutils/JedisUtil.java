package com.jknows_backend.utils.jedisutils;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class JedisUtil {

    private static JedisPool jedisPool;

    static {
        //配置连接池
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        //最大连接数
        poolConfig.setMaxTotal(64);
        //最大空闲连接
        poolConfig.setMaxIdle(64);
        //最小空闲连接
        poolConfig.setMinIdle(0);
        //最长等待时间,ms
        poolConfig.setMaxWaitMillis(3000);

        //123.60.52.71
        //创建连接池对象
        jedisPool = new JedisPool(poolConfig, "123.60.52.71", 6379, 1000, "123456");
    }

    public static Jedis getJedis() {
        return jedisPool.getResource();
    }
}