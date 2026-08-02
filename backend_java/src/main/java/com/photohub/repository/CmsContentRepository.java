package com.photohub.repository;

import com.photohub.model.CmsContent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CmsContentRepository extends JpaRepository<CmsContent, Long> {
}
