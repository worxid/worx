package id.worx.worx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class WorxApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorxApplication.class, args);
	}

}
