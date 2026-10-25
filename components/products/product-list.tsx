"use client";

import { motion } from "framer-motion";
import { RevealGroup, revealItem } from "@/components/motion/reveal";
import { products } from "@/lib/content/products";
import { ProductCard } from "./product-card";

/** Product cards that stagger in as they scroll into view. */
export function ProductList() {
    return (
        <RevealGroup as="ul" className="grid gap-6">
            {products.map((p) => (
                <motion.li key={p.slug} variants={revealItem}>
                    <ProductCard product={p} />
                </motion.li>
            ))}
        </RevealGroup>
    );
}
