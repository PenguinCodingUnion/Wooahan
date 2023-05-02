package com.wooahan.back.dto;

public enum Initial {
    ㄱ(0),ㄲ(0),
    ㄴ(1),
    ㄷ(2),ㄸ(2),
    ㄹ(3),
    ㅁ(4),
    ㅂ(5), ㅃ(5),
    ㅅ(6),ㅆ(6),
    ㅇ(7),
    ㅈ(8),ㅉ(8),
    ㅊ(9), ㅋ(10),ㅌ(11),ㅍ(12),ㅎ(13);
    private int value;

    Initial(int value) {
        this.value = value;
    }


    public int getValue() {
        return value;
    }
}
