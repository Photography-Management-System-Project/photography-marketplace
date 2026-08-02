package com.photohub.controller;

import com.photohub.model.CmsContent;
import com.photohub.service.CmsContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/cms")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminCmsController {
    private final CmsContentService service;

    @GetMapping
    public CmsContent getCmsContent() {
        return service.getCmsContent();
    }

    @PutMapping
    public CmsContent updateCmsContent(@RequestBody CmsContent content) {
        return service.updateCmsContent(content);
    }
}
