package com.epai.core.controller;

import com.epai.common.web.RequestUtils;
import com.epai.core.pojo.user.Buyer;
import com.epai.core.service.buyer.BuyerService;
import com.epai.core.service.session.SessionProvider;
import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * 注册
 */
@Controller
public class RegisterController {
    @Autowired
    private BuyerService buyerService;
    @Autowired
    private SessionProvider sessionProvider;

    @RequestMapping(value="/register.aspx",method= RequestMethod.GET)
    public String login(String ReturnUrl,Model model){
        if(null == ReturnUrl){
            ReturnUrl = "localhost:8082";//portal
        }
        model.addAttribute("ReturnUrl", ReturnUrl);
        return "login";
    }
    @RequestMapping(value = "/register.aspx",method = RequestMethod.POST)
    public String toRegister(String username, String password,String email, String ReturnUrl, HttpServletRequest request, HttpServletResponse response, Model model){
        if(null != username){
            if(null != password){
                Buyer buyer = buyerService.selectBuyerByUsername(username);
                if(null == buyer){
                    buyerService.insertBuyer(username,encodePass(password),email);//密码加密
                    //注册成功,保存用户
                    sessionProvider.setAttributeForUsername(RequestUtils.getCSESSION(request, response), username);
                    if(ReturnUrl == null){
                        ReturnUrl = "localhost:8082";
                    }
                    return "redirect:"+ReturnUrl;
                }else{
                    model.addAttribute("error", "用户已存在");
                }
            }else{
                model.addAttribute("error", "密码不能为空");
            }
        }else{
            model.addAttribute("error", "用户名不能为空");
        }
        return "login";
    }

    public String encodePass(String password){
        String algorithm = "MD5";
        char[] encodeHex = null;
        try {
            MessageDigest instance = MessageDigest.getInstance(algorithm);
            byte[] digest = instance.digest(password.getBytes());
            encodeHex = Hex.encodeHex(digest);
        } catch (NoSuchAlgorithmException e) {

            e.printStackTrace();
        }
        return new String(encodeHex);
    }

}
