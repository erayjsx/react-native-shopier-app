import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import * as Crypto from "expo-crypto";
import { WebView } from "react-native-webview";
import { router } from "expo-router";

export default function App() {
  const [data, setData] = useState();

  const apiKey = "0c177d5a63a37119a12c6c3468cc899b";
  const secret = "20d17ef2fb8f4178a2a753382d08d420";

  const handlePayment = async () => {
    const formData = {
      API_key: apiKey,
      website_index: 0,
      platform_order_id: "23435345",
      product_name: "Test Ürün",
      product_type: 1,
      buyer_name: "Ahmet",
      buyer_surname: "Mehmet",
      buyer_email: "ahmet@example.com",
      buyer_account_age: 365,
      buyer_phone: "5551234567",
      billing_address: "Örnek Sokak 1, İstanbul",
      billing_city: "İstanbul",
      billing_country: "TR",
      billing_postcode: "34000",
      shipping_address: "Örnek Sokak 1, İstanbul",
      shipping_city: "İstanbul",
      shipping_country: "TR",
      shipping_postcode: "34000",
      total_order_value: "151.00",
      currency: 0,
      platform: 0,
      is_in_frame: 1,
      current_language: 0,
      modul_version: "1.0.4",
      random_nr: Math.floor(Math.random() * 9000000) + 1000000,
    };

    const dataToHash = `${formData.random_nr}${formData.platform_order_id}${formData.total_order_value}${formData.currency}`;

    const signature = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      dataToHash + secret,
      { encoding: Crypto.CryptoEncoding.BASE64 }
    );

    // İmzayı forma ekle
    formData.signature = signature;
    const formInputs = Object.keys(formData)
      .map(
        (key) =>
          `<input type="hidden" name="${key}" value="${formData[key]}" />`
      )
      .join("");

    const htmlContent = `
      <html>
        <body>
          <form id="shopier_payment_form" action="https://www.shopier.com/ShowProduct/api_pay4.php" method="post">
            ${formInputs}
          </form>
          <script>
            document.getElementById('shopier_payment_form').submit();
          </script>
        </body>
      </html>
    `;

    setData(htmlContent);
  };

  useEffect(() => {
    handlePayment();
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: "https://e42d-31-223-64-69.ngrok-free.app" }}
        style={{ flex: 1, marginTop: -48 }}
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 https://wavedijital.com"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
});
