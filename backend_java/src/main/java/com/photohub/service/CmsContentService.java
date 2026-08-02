package com.photohub.service;

import com.photohub.model.CmsContent;
import com.photohub.repository.CmsContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CmsContentService {
    private final CmsContentRepository repository;

    public CmsContent getCmsContent() {
        List<CmsContent> content = repository.findAll();
        if (content.isEmpty()) {
            CmsContent defaultCms = new CmsContent();
            defaultCms.setHeroTitle("Find and Hire Top Photographers");
            defaultCms.setHeroSubtitle("Book the best professionals for your events.");
            defaultCms.setPrimaryButton("Find Photographers");
            defaultCms.setSecondaryButton("Join as Photographer");
            defaultCms.setAboutUsText("We connect clients with professionals.");
            defaultCms.setFaqsJson("[]");
            return repository.save(defaultCms);
        }
        return content.get(0);
    }
    
    public CmsContent updateCmsContent(CmsContent newContent) {
        CmsContent current = getCmsContent();
        newContent.setId(current.getId());
        return repository.save(newContent);
    }
}
