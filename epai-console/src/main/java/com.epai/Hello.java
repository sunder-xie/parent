package com.epai;

import com.epai.core.pojo.TestTb;
import com.epai.core.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 */
@Controller
public class Hello {

    @RequestMapping("/")
    public String show(){
        return "index";
    }

    @Autowired
    private TestService testService;

    @RequestMapping("test/index.do")
    public String test(){
        TestTb tb = new TestTb();
        tb.setName("ping");
        testService.insertTb(tb);
        return "index";
    }
}
