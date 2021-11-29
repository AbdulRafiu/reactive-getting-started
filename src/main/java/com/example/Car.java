package com.example;

import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;

import javax.persistence.*;

@Entity
@Cacheable
public class Car extends PanacheEntityBase {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

    @Column
    private String name;
    @Column
    private String variant;
    @Column
    private String make;
    @Column
    private Integer model;
    @Column
    private Character isAutomatic;

    public Car(Long id, String name, String variant, String make, Integer model, Character isAutomatic) {
        this.id = id;
        this.name = name;
        this.variant = variant;
        this.make = make;
        this.model = model;
        this.isAutomatic = isAutomatic;
    }

    public Car() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVariant() {
        return variant;
    }

    public void setVariant(String variant) {
        this.variant = variant;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public Integer getModel() {
        return model;
    }

    public void setModel(Integer model) {
        this.model = model;
    }

    public Character getAutomatic() {
        return isAutomatic;
    }

    public void setAutomatic(Character automatic) {
        isAutomatic = automatic;
    }
}
