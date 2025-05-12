package com.internship.virtual.internship;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import com.internship.virtual.internship.model.Manager;
import com.internship.virtual.internship.repository.ManagerRepository;
@SpringBootApplication
public class VirtualInternshipSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(VirtualInternshipSystemApplication.class, args);
    }
    @Bean
    public CommandLineRunner initializeManager(ManagerRepository managerRepository) {
        return args -> {
            // Check if a manager already exists
            if (managerRepository.count() == 0) {
                // Create a default manager if none exists
                Manager manager = new Manager();
                manager.setUsername("admin");
                manager.setPassword("admin123");
                managerRepository.save(manager);
                System.out.println("Default manager created with username: admin and password: admin123");
            }
        };
    }
}
