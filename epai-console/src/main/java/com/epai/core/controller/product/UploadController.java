package com.epai.core.controller.product;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import com.epai.common.web.Constants;
import com.epai.core.service.product.UploadService;

@Controller
@RequestMapping(value="/upload")
public class UploadController {
	@Autowired
	private UploadService uploadService;
	@RequestMapping("/uploadImg.do")
	public void uploadImg(MultipartFile pic,HttpServletRequest request,HttpServletResponse response) throws Exception{
		/*System.out.println(pic.getOriginalFilename());
		String realPath = request.getSession().getServletContext().getRealPath("");
		String dataPath="/upload/"+pic.getOriginalFilename();*/
		//全路径
		//String url = realPath+dataPath;
		String path = uploadService.uploadPic(pic.getBytes(), pic.getOriginalFilename(), pic.getSize());
		//pic.transferTo(new File(url));
		JSONObject jo = new JSONObject();
		jo.put("path", Constants.IMG_URL+path);

		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().write(jo.toString());
	}
	@RequestMapping("/uploadPics.do")
	public @ResponseBody List<String> uploadPics(@RequestParam(required=false) MultipartFile[] pics,HttpServletRequest request,HttpServletResponse response) throws Exception{
		List<String> urls = new ArrayList<String>();
		for(MultipartFile pic:pics){
			String path = uploadService.uploadPic(pic.getBytes(), pic.getOriginalFilename(), pic.getSize());
			
			String url = Constants.IMG_URL+path;
			
			urls.add(url);
		}
		
		return urls;
	}
	//富文本编辑器异步上传图片
	@RequestMapping("/uploadFck.do")
	public void uploadFck(HttpServletRequest request,HttpServletResponse response) throws Exception{
		MultipartRequest mr = (MultipartRequest)request;
		Map<String, MultipartFile> files = mr.getFileMap();
		Set<Entry<String,MultipartFile>> entrySet = files.entrySet();
		for (Entry<String, MultipartFile> entry : entrySet) {
			MultipartFile pic = entry.getValue();
			String path = uploadService.uploadPic(pic.getBytes(), pic.getOriginalFilename(), pic.getSize());
			//pic.transferTo(new File(url));
			JSONObject jo = new JSONObject();
			jo.put("path", Constants.IMG_URL+path);
			jo.put("error", 0);//0为错误数
			response.setContentType("application/json;charset=UTF-8");
			response.getWriter().write(jo.toString());
		}
	}

}
