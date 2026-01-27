package com.example.stock_trading_simulation.repository;


import com.example.stock_trading_simulation.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {
}

