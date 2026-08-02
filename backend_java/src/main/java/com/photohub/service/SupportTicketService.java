package com.photohub.service;

import com.photohub.model.SupportTicket;
import com.photohub.repository.SupportTicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SupportTicketService {
    private final SupportTicketRepository repository;

    public List<SupportTicket> getAllTickets() {
        return repository.findAll();
    }
    
    public SupportTicket getTicket(Long id) {
        return repository.findById(id).orElse(null);
    }
    
    public SupportTicket updateTicket(Long id, SupportTicket updated) {
        updated.setId(id);
        return repository.save(updated);
    }
}
