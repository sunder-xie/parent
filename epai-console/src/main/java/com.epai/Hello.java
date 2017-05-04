package com.epai;

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
}
