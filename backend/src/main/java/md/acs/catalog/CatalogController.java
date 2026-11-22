package md.acs.catalog;

import java.util.List;

import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CatalogController {

    private final CatalogRepository repository;

    public CatalogController(CatalogRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/catalog")
    public Catalog getCatalog() {
        return new Catalog(repository.findGroups(), repository.findCategories(), repository.findProducts());
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        return repository.findProducts();
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable("id") String id) {
        return ResponseEntity.of(repository.findProduct(id));
    }

    @ExceptionHandler(DataAccessResourceFailureException.class)
    public ProblemDetail databaseUnavailable() {
        return ProblemDetail.forStatusAndDetail(
                HttpStatus.SERVICE_UNAVAILABLE, "PostgreSQL временно недоступна.");
    }
}
