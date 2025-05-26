"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  videos: string[];
}

export default function PropertyGallery({ images, videos }: PropertyGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openVideoModal = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setVideoModalOpen(true);
  };

  return (
    <div>
      {/* Main Image */}
      <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-4">
        <Image
          src={mainImage}
          alt="Property main image"
          fill
          className="object-cover"
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
          onClick={() => openLightbox(images.indexOf(mainImage))}
        >
          <ImageIcon className="h-5 w-5" />
        </Button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {images.slice(0, 5).map((image, index) => (
          <div
            key={index}
            className={`aspect-square rounded-md overflow-hidden cursor-pointer relative ${
              mainImage === image ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleThumbnailClick(image)}
          >
            <Image
              src={image}
              alt={`Property image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
        
        {videos.length > 0 && (
          <div
            className="aspect-square rounded-md overflow-hidden cursor-pointer relative bg-gray-900"
            onClick={() => openVideoModal(videos[0])}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="h-8 w-8 text-white dark:text-white" />
            </div>
            <div className="absolute bottom-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
              Video
            </div>
          </div>
        )}
      </div>

      {/* Lightbox for Images */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
            onClick={prevImage}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={images[lightboxIndex]}
              alt={`Property image ${lightboxIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
            onClick={nextImage}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === lightboxIndex ? "bg-white" : "bg-gray-500 dark:bg-gray-400"
                  }`}
                  onClick={() => setLightboxIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
          <div className="relative aspect-video w-full">
            {currentVideoUrl && (
              <video 
                src={currentVideoUrl} 
                controls 
                autoPlay 
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}