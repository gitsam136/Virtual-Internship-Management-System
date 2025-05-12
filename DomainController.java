package com.internship.virtual.internship.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.internship.virtual.internship.model.Domain;
import com.internship.virtual.internship.model.Internship;
import com.internship.virtual.internship.service.DomainService;
import com.internship.virtual.internship.service.InternshipService;
@RestController
@RequestMapping("/api/domains")
public class DomainController {
    @Autowired
    private DomainService domainService;
    @Autowired
    private InternshipService internshipService;
    @GetMapping
    public ResponseEntity<List<Domain>> getAllDomains() {
        List<Domain> domains = domainService.findAll();
        return ResponseEntity.ok(domains);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Domain> getDomainById(@PathVariable Long id) {
        Domain domain = domainService.findById(id);
        if (domain != null) {
            return ResponseEntity.ok(domain);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/{id}/internships")
    public ResponseEntity<List<Internship>> getInternshipsByDomain(@PathVariable Long id) {
        Domain domain = domainService.findById(id);
        if (domain != null) {
            List<Internship> internships = internshipService.findByDomain(domain);
            return ResponseEntity.ok(internships);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/byName/{name}")
    public ResponseEntity<Domain> getDomainByName(@PathVariable String name) {
        Domain domain = domainService.findByName(name);
        if (domain != null) {
            return ResponseEntity.ok(domain);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/add")
    public ResponseEntity<Domain> addDomain(@RequestParam String name, @RequestParam String description) {
        Domain domain = new Domain();
        domain.setName(name);
        domain.setDescription(description);
        Domain savedDomain = domainService.save(domain);
        return ResponseEntity.ok(savedDomain);
    }
}
