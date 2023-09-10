package com.example.vditor;
import com.alibaba.fastjson.JSON;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/image")
@CrossOrigin
public class ImageUploadController {

    @Value(value = "${upload.path}")
    private String uploadPath;

    @RequestMapping(value = "/upload", method = RequestMethod.GET)
    public String test() {
        return "test";
    }

    /**
     * 上传图片并预览
     */
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public String uploadImage(@RequestParam(value = "file[]") MultipartFile multipartFile) {
        try {
            if (multipartFile.isEmpty()) {
                return "文件为空,请重新选择!";
            }

            // 上传的图片全部保存在 uploadPath 目录下
            File file = new File(uploadPath);
            if (!file.exists()) {
                // 创建完整的目录
                file.mkdirs();
            }

            // 获取文件原始名(包含后缀名)
            String orgName = multipartFile.getOriginalFilename();
            // 获取文件名（不包括后缀）
            String prefixName = orgName.substring(0, orgName.lastIndexOf("."));
            // 获取文件后缀名
            String suffixName = orgName.substring(orgName.lastIndexOf("."));
            // 这是处理后的新文件名
            String fileName;

            if(orgName.contains(".")) {
                // 示例：avatar.123.png，经过处理后得到：avatar.123_1661136943533.png
                fileName = prefixName + "_" + System.currentTimeMillis() + suffixName;
            } else {
                // 上传的图片没有后缀
                return "上传图片格式错误,请重新选择！";
            }

            String savePath = file.getPath() + File.separator + fileName;
            File saveFile = new File(savePath);
            // 将上传的文件复制到指定目录
            FileCopyUtils.copy(multipartFile.getBytes(), saveFile);

            // 返回给前端的图片保存路径；前台可以根据返回的路径拼接完整地址，即可在浏览器上预览该图片
            String path = "/upload" + File.separator + fileName;
            if (path.contains("\\")) {
                path = path.replace("\\", "/");
            }
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("url", path);
            map.put("filename",fileName);
            return JSON.toJSONString(map);
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
        return "";
    }

}
