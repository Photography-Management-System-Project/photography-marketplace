package com.photohub.controller;

import com.photohub.model.SupportTicket;
import com.photohub.service.SupportTicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/tickets")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminSupportTicketController {
    private final SupportTicketService service;

    @GetMapping
    public List<SupportTicket> getAllTickets() {
        return service.getAllTickets();
    }
    
    @PutMapping("/{id}")
    public SupportTicket updateTicket(@PathVariable Long id, @RequestBody SupportTicket ticket) {
        return service.updateTicket(id, ticket);
    }
}
