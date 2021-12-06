package egg.FinalProyect.PetStore.controllers;

import egg.FinalProyect.PetStore.entities.ProductPackage.Accessory;
import egg.FinalProyect.PetStore.entities.ProductPackage.Food;
import egg.FinalProyect.PetStore.entities.ProductPackage.Product;
import egg.FinalProyect.PetStore.entities.UserPackage.AppUser;
import egg.FinalProyect.PetStore.repositories.ProductPackage.ProductRepository;
import egg.FinalProyect.PetStore.repositories.UserPackage.AdminRepository;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/")
public class MainController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/")
    public String index(Model model) {

        if (!productRepository.findAll().isEmpty()) {
            List<Product> products = productRepository.findAll();

            products.sort(Product.orderByBrand);
            List<String> brands = new ArrayList();
            List<String> petTypes = new ArrayList();
            int foods = 0;
            int accessories = 0;
            int maxPrice = 0;

            for (Product product : products) {

                if (product.getProductType().equals("food")) {
                    foods++;
                } else {
                    accessories++;
                }

                if (!brands.contains(product.getBrand())) {
                    brands.add(product.getBrand());
                }

                if (!petTypes.contains(product.getPet())) {
                    petTypes.add(product.getPet());
                }
                int productPrice = Integer.parseInt(product.getPrice());
                if (productPrice > maxPrice) {
                    maxPrice = productPrice;
                }

            }

            List<String> petSizes = new ArrayList();
            petSizes.add("small");
            petSizes.add("medium");
            petSizes.add("big");

            List<String> petAges = new ArrayList();
            petAges.add("puppy");
            petAges.add("young");
            petAges.add("adult");

            model.addAttribute("brands", brands);
            model.addAttribute("petTypes", petTypes);
            model.addAttribute("petSizes", petSizes);
            model.addAttribute("petAges", petAges);
            model.addAttribute("foods", foods);
            model.addAttribute("accessories", accessories);
            model.addAttribute("maxPrice", maxPrice);
        }

        return "index.html";
    }

    @GetMapping("/login")
    public String login(@RequestParam(required = false) String error, Integer selector, Model model) {

        model.addAttribute("selector", selector);
        if (error != null) {
            model.addAttribute("error", "Nombre de usuario o contraseña incorrectos");
        }
        return "login.html";
    }

    @PostMapping("/logincheck")
    public String loginForm(String username, String password) {

        return "index";
    }

    //Registro de la página principal para el ingreso del cliente.
    @GetMapping("/registration")
    public String registration() {
        return "newClient";
        /*incorporar el registro de un admin desde el index del  admin Primario.*/
 /*debe tener un return a una vista con permiso exclusivo del admin Primario.*/
    }

    @GetMapping("/privateIndex")
    public String privateIndex(Authentication auth, HttpSession session, Model model) {

        Integer selector = 0;
        String email = auth.getName();

        if (session.getAttribute("client") == null) {
            AppUser appUser = adminRepository.findByMail(email);
            appUser.setPassword(null);

            session.setAttribute("appUser", appUser);
        }
        model.addAttribute("selector", selector);
        return "index";
    }

    @GetMapping("/test")
    public String test() {
        return "nueva";
    }

    @GetMapping("/modalProduct")
    public String modalProduct(String productId, Model model) {

        System.out.println(productId);
        Product product = productRepository.findById(productId).get();

        model.addAttribute("brand", product.getBrand());
        model.addAttribute("name", product.getName());
        model.addAttribute("productType", product.getProductType());
        model.addAttribute("image", product.getImage());
        model.addAttribute("description", product.getDescription());
        model.addAttribute("petType", product.getPet());
        model.addAttribute("petAge", product.getPetAge());
        model.addAttribute("petSize", product.getPetSize());

        return "modalProduct";

    }

    @GetMapping("/products")
    public String products(Model model) {
        List<Product> products = productRepository.findAll();

        products.sort(Product.orderByBrand);
//        List<String> brands = new ArrayList();
//        List<String> petTypes = new ArrayList();
//        int foods = 0;
//        int accessories = 0;
//
//        List<String> prices = new ArrayList();
//
//        for (Product product : products) {
//
//            if (product.getProductType().equals("food")) {
//                foods++;
//            } else {
//                accessories++;
//            }
//
//            if (!brands.contains(product.getBrand())) {
//                brands.add(product.getBrand());
//            }
//
//            if (!petTypes.contains(product.getPet())) {
//                petTypes.add(product.getPet());
//            }
//
//            if (!prices.contains(product.getPrice())) {
//                prices.add(product.getPrice());
//            }
//
//        }

        model.addAttribute("products", products);

        return "products";

    }

    public List<Product> brands(List<String> brands, List<Product> finalList) {

        List<Product> newList = new ArrayList();

        for (String brand : brands) {
            for (Product product : finalList) {
                if (product.getBrand().equals(brand)) {
                    newList.add(product);
                }
            }
        }

        return newList;
    }

    public List<Product> petTypes(List<String> petTypes, List<Product> finalList) {
        List<Product> newList = new ArrayList();

        for (String petType : petTypes) {
            for (Product product : finalList) {
                if (product.getPet().equals(petType)) {
                    newList.add(product);
                }
            }
        }

        return newList;
    }

    public List<Product> petSizes(List<String> petSizes, List<Product> finalList) {
        List<Product> newList = new ArrayList();

        for (String petSize : petSizes) {
            for (Product product : finalList) {
                if (product.getPetSize().equals(petSize)) {
                    newList.add(product);
                }
            }
        }

        return newList;
    }

    public List<Product> petAges(List<String> petAges, List<Product> finalList) {
        List<Product> newList = new ArrayList();

        for (String petAge : petAges) {
            for (Product product : finalList) {
                if (product.getPetAge().equals(petAge)) {
                    newList.add(product);
                }
            }
        }

        return newList;
    }

    public List<Product> prices(Integer price, List<Product> finalList) {
        List<Product> newList = new ArrayList();

        for (Product product : finalList) {
            int productPrice = Integer.parseInt(product.getPrice());
            if (productPrice <= price) {
                newList.add(product);
            }
        }

        return newList;
    }
    
    public List<Product> productTypes(String productType, List<Product> finalList) {
        List<Product> newList = new ArrayList();

        for (Product product : finalList) {
            if (product.getProductType().equals(productType)) {
                newList.add(product);
            }
        }

        return newList;
    }

    @GetMapping("/listFilter")
    public String listFilter(@RequestParam(required = false) List<String> brands, @RequestParam(required = false) List<String> petTypes, @RequestParam(required = false) List<String> petSizes, @RequestParam(required = false) List<String> petAges, @RequestParam(required = false) List<String> all, @RequestParam(required = false) Integer price, @RequestParam(required = false) String productType, Model model) {

        List<Product> finalList = productRepository.findAll();

        finalList.sort(Product.orderByBrand);

        if (all.isEmpty()) {
            if (!brands.isEmpty()) {

                finalList = brands(brands, finalList);

            }

            if (!petTypes.isEmpty()) {

                finalList = petTypes(petTypes, finalList);
            }

            if (!petSizes.isEmpty()) {

                finalList = petSizes(petSizes, finalList);
            }

            if (!petAges.isEmpty()) {

                finalList = petAges(petAges, finalList);
            }

            if (price > 0) {
                
                finalList = prices(price, finalList);
            }
            
            if (!productType.isEmpty()) {
                
                finalList = productTypes(productType, finalList);
            }
        }

        model.addAttribute("products", finalList);

        return "products";
    }
}
