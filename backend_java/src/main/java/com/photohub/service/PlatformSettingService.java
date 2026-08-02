package com.photohub.service;

import com.photohub.model.PlatformSetting;
import com.photohub.repository.PlatformSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlatformSettingService {
    private final PlatformSettingRepository repository;

    public PlatformSetting getSettings() {
        List<PlatformSetting> settings = repository.findAll();
        if (settings.isEmpty()) {
            PlatformSetting defaultSettings = new PlatformSetting();
            defaultSettings.setPlatformName("PhotoHub");
            defaultSettings.setSupportEmail("support@photohub.com");
            defaultSettings.setMaintenanceMode(false);
            defaultSettings.setAutoApprovePhotographers(false);
            defaultSettings.setRequireEmailVerification(true);
            return repository.save(defaultSettings);
        }
        return settings.get(0);
    }
    
    public PlatformSetting updateSettings(PlatformSetting newSettings) {
        PlatformSetting current = getSettings();
        newSettings.setId(current.getId());
        return repository.save(newSettings);
    }
}
