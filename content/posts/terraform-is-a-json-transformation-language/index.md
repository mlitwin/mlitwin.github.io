---
title: "Terraform is a JSON transformation language with side-effects"
date: "2020-03-08T21:35:35-07:00"
categories: []
dropCap: false
displayInMenu: false
displayInList: true
draft: true
---

We use Terraform a lot at my work. There's been an interesting learning curve as I've gone from no knowledge of it, to using it in production. I had a bit of trouble figuring out a conceptual model - a way of thinking about what it was doing - that worked for me.

Eventually I found one.

## What Terraform is

Terraform configurations are written in [HCL](https://github.com/hashicorp/hcl) which is

> a specialized language for our tools, and JSON as the interoperability layer.

HCL provides significant templating functionality, and syntactic sugar - but to understand what the configuration will actually do, you should think of it as JSON. Specifically, think of it in terms of a set of deeply nested objects, with key -> value a.b.c.f -> config. The meaning of the config comes from the keys, and the value. 

## A Mental Modal for Terraform

Schematically, here's what happens when you use terraform:

$$\operatorname{T}(state, code; infrastructure) \rightarrow (state', infrastructure')$$

![Terraform Flowchart](/diagrams/terraform.svg)
