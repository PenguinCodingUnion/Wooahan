package com.ssafy.diary;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.fragment.app.Fragment;

public class Fragment1 extends Fragment  {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState){
        //xml을 inflater해서 최상위 부모 참조 변수인 View에 담는다.
        ViewGroup rootView=(ViewGroup) inflater.inflate(R.layout.fragment1, container, false);
        initUI(rootView);
        return rootView;
    }

    private void initUI(ViewGroup rootView){

    }
}
