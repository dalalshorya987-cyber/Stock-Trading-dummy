package com.example.stock_trading_simulation.controller;

import com.example.stock_trading_simulation.model.Stock;
import com.example.stock_trading_simulation.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stocks")
@CrossOrigin
public class StockController {

    @Autowired
    private StockRepository repo;

    @PostMapping
    public Stock addStock(@RequestBody Stock stock) {
        return repo.save(stock);
    }

    @GetMapping
    public List<Stock> getAllStocks() {
        return repo.findAll();
    }
}

