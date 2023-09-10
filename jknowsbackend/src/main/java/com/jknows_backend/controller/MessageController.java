package com.jknows_backend.controller;

import com.jknows_backend.entity.Message;
import com.jknows_backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class MessageController {

    @Autowired
    private MessageService messageService;

    @RequestMapping(value = "/getMessage",method = {RequestMethod.GET,RequestMethod.POST})
    public List<Message> getMessage(@RequestParam("userId") int userId) {
        System.out.println("getMessage");
        return messageService.getMessage(userId);
    }

    @RequestMapping(value = "/getMessages",method = {RequestMethod.GET,RequestMethod.POST})
    public List<Message> getMessages(@RequestParam("userId") int userId, @RequestParam("start") int start, @RequestParam("end") int end) {
        System.out.println("getMessages");
        return messageService.getMessages(userId, start, end);
    }

    @RequestMapping(value = "/addMessage",method = {RequestMethod.GET,RequestMethod.POST})
    public Message addMessage(@RequestParam("sender") int sender, @RequestParam("receiver") int receiver, @RequestParam("questionId") int questionId) {
        System.out.println("addMessage");
        return messageService.addMessage(sender, receiver, questionId);
    }
}
