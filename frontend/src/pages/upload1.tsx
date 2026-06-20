import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Upload as UploadIcon,
  FileImage,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  TrendingUp,
  Shield,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";

const Upload: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [dragOver, setDragOver] = useState<"image" | "csv" | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  // Handle drag & drop
  const handleDrag = useCallback(
    (e: React.DragEvent, type: "image" | "csv") => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragOver(type);
      } else if (e.type === "dragleave") {
        setDragOver(null);
      }
    },
    []
  );

  const handleDrop = useCallback((e: React.DragEvent, type: "image" | "csv") => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(null);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (type === "image" && file.type.startsWith("image/")) {
      handleImageFile(file);
    } else if (type === "csv" && file.name.toLowerCase().endsWith(".csv")) {
      handleCsvFile(file);
    } else {
      setError("Invalid file type. Please upload correct format.");
    }
  }, []);

  // Handle files
  const handleImageFile = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCsvFile = (file: File) => {
    setCsvFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split("\n").map((row) => row.split(","));
      setCsvPreview(rows.slice(0, 6)); // header + top 5 rows
    };
    reader.readAsText(file);
  };

  // Handle input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
    e.target.value = "";
  };

  const handleCsvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleCsvFile(file);
    e.target.value = "";
  };

  // Remove files
  const removeFile = (type: "image" | "csv") => {
    if (type === "image") {
      setImageFile(null);
      setImagePreview(null);
    } else {
      setCsvFile(null);
      setCsvPreview([]);
    }
  };

  // Submit form
  const handleSubmit = async () => {
    if (!imageFile || !csvFile) {
      setError("Please select both an image and a CSV file.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file_img", imageFile);
      formData.append("file_csv", csvFile);

      const response = await axios.post(
        "http://localhost:8000/analyze_form",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to get analysis from server."
      );
    } finally {
      setLoading(false);
    }
  };

  const getResultBgColor = (isHealthy: boolean) =>
    isHealthy ? "bg-green-50 border-green-200" : "bg-red-50 border-red-400";
  const getTextColor = (isHealthy: boolean) =>
    isHealthy ? "text-green-800" : "text-red-800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 pt-24 max-w-7xl"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Crop Disease & Dataset Analyzer
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Upload your crop image and dataset (CSV) to get AI-powered predictions
          and insights.
        </p>
      </motion.div>

      {/* Error alert */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload */}
        <Card className="h-full transition-all hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <FileImage className="h-6 w-6 text-green-600" />
              Crop Image
            </CardTitle>
            <CardDescription>Upload an image of your crop</CardDescription>
          </CardHeader>
          <CardContent>
            {!imageFile ? (
              <div
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer ${
                  dragOver === "image"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
                onDragEnter={(e) => handleDrag(e, "image")}
                onDragLeave={(e) => handleDrag(e, "image")}
                onDragOver={(e) => handleDrag(e, "image")}
                onDrop={(e) => handleDrop(e, "image")}
                onClick={() => document.getElementById("image-input")?.click()}
              >
                <UploadIcon className="mx-auto h-10 w-10 text-green-600 mb-3" />
                <p className="text-gray-600">Drop or click to upload image</p>
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative group">
                <img
                  src={imagePreview!}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl border"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                  onClick={() => removeFile("image")}
                >
                  <X className="h-4 w-4" /> Remove
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CSV Upload */}
        <Card className="h-full transition-all hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <FileSpreadsheet className="h-6 w-6 text-blue-600" />
              Dataset CSV
            </CardTitle>
            <CardDescription>Upload CSV dataset</CardDescription>
          </CardHeader>
          <CardContent>
            {!csvFile ? (
              <div
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer ${
                  dragOver === "csv"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
                onDragEnter={(e) => handleDrag(e, "csv")}
                onDragLeave={(e) => handleDrag(e, "csv")}
                onDragOver={(e) => handleDrag(e, "csv")}
                onDrop={(e) => handleDrop(e, "csv")}
                onClick={() => document.getElementById("csv-input")?.click()}
              >
                <UploadIcon className="mx-auto h-10 w-10 text-blue-600 mb-3" />
                <p className="text-gray-600">Drop or click to upload CSV</p>
                <input
                  id="csv-input"
                  type="file"
                  accept=".csv"
                  onChange={handleCsvChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative group">
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                  onClick={() => removeFile("csv")}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-auto border">
                  <table className="w-full text-xs">
                    <tbody>
                      {csvPreview.map((row, i) => (
                        <tr
                          key={i}
                          className={i === 0 ? "font-semibold" : "text-gray-600"}
                        >
                          {row.map((cell, j) => (
                            <td
                              key={j}
                              className="border px-2 py-1 bg-white"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Submit */}
      <div className="text-center mt-8">
        <Button
          disabled={loading || !imageFile || !csvFile}
          size="lg"
          className="px-12 py-4 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg"
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <TrendingUp className="mr-3 h-5 w-5" />
              Start AI Analysis
            </>
          )}
        </Button>
      </div>

      {/* Results */}
      {result && !loading && (
        <motion.div
          ref={resultsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Analysis Results
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image analysis */}
            <Card
              className={`${getResultBgColor(
                result.image_analysis.prediction === "Healthy"
              )}`}
            >
              <CardHeader>
                <CardTitle
                  className={`flex items-center gap-3 text-2xl ${getTextColor(
                    result.image_analysis.prediction === "Healthy"
                  )}`}
                >
                  <Shield className="h-6 w-6" />
                  Image Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Prediction:{" "}
                  <Badge
                    variant={
                      result.image_analysis.prediction === "Healthy"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {result.image_analysis.prediction}
                  </Badge>
                </p>
                <p>Confidence: {result.image_analysis.confidence}%</p>
                <p>Solution: {result.image_analysis.solution}</p>
              </CardContent>
            </Card>

            {/* Dataset analysis */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-blue-800">
                  <TrendingUp className="h-6 w-6" />
                  Dataset Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Disease Risk: {result.dataset_analysis.disease_risk_percentage}
                  %
                </p>
                <p>
                  Status:{" "}
                  {result.dataset_analysis.disease_observed === 1
                    ? "Detected"
                    : "Not Detected"}
                </p>
                <p>
                  Pesticide Level: {result.dataset_analysis.pesticide_amount_ppm}{" "}
                  PPM
                </p>
                <p>Growth Stage: {result.dataset_analysis.growth_stage}</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Upload;
