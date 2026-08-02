package com.photohub.controller;

import com.photohub.model.PlatformSetting;
import com.photohub.service.PlatformSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/settings")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminPlatformSettingController {
    private final PlatformSettingService service;

    @GetMapping
    public PlatformSetting getSettings() {
        return service.getSettings();
    }

    @PutMapping
    public PlatformSetting updateSettings(@RequestBody PlatformSetting settings) {
        return service.updateSettings(settings);
    }
}
