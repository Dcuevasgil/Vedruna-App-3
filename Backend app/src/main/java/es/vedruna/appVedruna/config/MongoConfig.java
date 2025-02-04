package es.vedruna.appVedruna.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "es.vedruna.appVedruna.repository")
@ComponentScan(basePackages = "es.vedruna.appVedruna")
public class MongoConfig {
    // Aquí puedes incluir configuraciones adicionales para Mongo si es necesario
}
