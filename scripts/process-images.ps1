Add-Type -AssemblyName System.Drawing

function Resize-And-Crop-Image {
    param(
        [string]$SourcePath,
        [int]$TargetWidth,
        [int]$TargetHeight,
        [string]$DestinationPath,
        [int]$Quality = 92
    )

    $srcImage = [System.Drawing.Image]::FromFile($SourcePath)
    $origW = $srcImage.Width
    $origH = $srcImage.Height

    $targetAspect = $TargetWidth / $TargetHeight
    $origAspect = $origW / $origH

    if ($origAspect -gt $targetAspect) {
        $cropH = $origH
        $cropW = [int]($origH * $targetAspect)
        $cropX = [int](($origW - $cropW) / 2)
        $cropY = 0
    } else {
        $cropW = $origW
        $cropH = [int]($origW / $targetAspect)
        $cropX = 0
        $cropY = [int](($origH - $cropH) / 2)
    }

    $destBitmap = New-Object System.Drawing.Bitmap($TargetWidth, $TargetHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($destBitmap)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $TargetWidth, $TargetHeight)

    $graphics.DrawImage($srcImage, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

    $dir = [System.IO.Path]::GetDirectoryName($DestinationPath)
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }

    $destBitmap.Save($DestinationPath, $jpegCodec, $encoderParams)

    $graphics.Dispose()
    $destBitmap.Dispose()
    $srcImage.Dispose()

    Write-Host "Processado: $DestinationPath ($TargetWidth x $TargetHeight)"
}

$images = @(
    @{
        Source = 'C:\Users\Gustavo\.gemini\antigravity-cli\brain\1d4e29cb-dd3f-4087-a17d-fd31ab439163\hero_chemical_laboratory_hades_quimica_1793759839706.jpg'
        Width = 1133
        Height = 657
        Dest = 'R:\Github\Web\Sites\hades-quimica\hadesquimica.github.io\assets\img\home.jpg'
    },
    @{
        Source = 'C:\Users\Gustavo\.gemini\antigravity-cli\brain\1d4e29cb-dd3f-4087-a17d-fd31ab439163\importacao_reagentes_quimicos_1793759885432.jpg'
        Width = 504
        Height = 282
        Dest = 'R:\Github\Web\Sites\hades-quimica\hadesquimica.github.io\assets\img\importacao.jpg'
    },
    @{
        Source = 'C:\Users\Gustavo\.gemini\antigravity-cli\brain\1d4e29cb-dd3f-4087-a17d-fd31ab439163\chemi_pharma_comercio_1793759907890.jpg'
        Width = 255
        Height = 256
        Dest = 'R:\Github\Web\Sites\hades-quimica\hadesquimica.github.io\assets\img\comercio.jpg'
    },
    @{
        Source = 'C:\Users\Gustavo\.gemini\antigravity-cli\brain\1d4e29cb-dd3f-4087-a17d-fd31ab439163\quimica_reembalagem_1793759916781.jpg'
        Width = 463
        Height = 338
        Dest = 'R:\Github\Web\Sites\hades-quimica\hadesquimica.github.io\assets\img\reembalagem.jpg'
    },
    @{
        Source = 'C:\Users\Gustavo\.gemini\antigravity-cli\brain\1d4e29cb-dd3f-4087-a17d-fd31ab439163\revenda_quimica_distribuicao_1793759935492.jpg'
        Width = 342
        Height = 342
        Dest = 'R:\Github\Web\Sites\hades-quimica\hadesquimica.github.io\assets\img\revenda.jpg'
    },
    @{
        Source = 'C:\Users\Gustavo\.gemini\antigravity-cli\brain\1d4e29cb-dd3f-4087-a17d-fd31ab439163\chemical_synthesis_laboratory_1793759942725.jpg'
        Width = 444
        Height = 332
        Dest = 'R:\Github\Web\Sites\hades-quimica\hadesquimica.github.io\assets\img\sintese.jpg'
    },
    @{
        Source = 'C:\Users\Gustavo\.gemini\antigravity-cli\brain\1d4e29cb-dd3f-4087-a17d-fd31ab439163\chemi_pharma_fracionamento_1793759947065.jpg'
        Width = 464
        Height = 343
        Dest = 'R:\Github\Web\Sites\hades-quimica\hadesquimica.github.io\assets\img\fracionamento.jpg'
    },
    @{
        Source = 'C:\Users\Gustavo\.gemini\antigravity-cli\brain\1d4e29cb-dd3f-4087-a17d-fd31ab439163\quienes_somos_chemi_pharma_1793759951916.jpg'
        Width = 504
        Height = 282
        Dest = 'R:\Github\Web\Sites\hades-quimica\hadesquimica.github.io\assets\img\quienes-somos.jpg'
    },
    @{
        Source = 'C:\Users\Gustavo\.gemini\antigravity-cli\brain\1d4e29cb-dd3f-4087-a17d-fd31ab439163\parcerias_chemi_pharma_1793759957245.jpg'
        Width = 504
        Height = 282
        Dest = 'R:\Github\Web\Sites\hades-quimica\hadesquimica.github.io\assets\img\parcerias.jpg'
    },
    @{
        Source = 'C:\Users\Gustavo\.gemini\antigravity-cli\brain\1d4e29cb-dd3f-4087-a17d-fd31ab439163\chemi_pharma_logo_1793760220188.jpg'
        Width = 180
        Height = 60
        Dest = 'R:\Github\Web\Sites\hades-quimica\hadesquimica.github.io\assets\img\logo.jpg'
    }
)

foreach ($item in $images) {
    Resize-And-Crop-Image -SourcePath $item.Source -TargetWidth $item.Width -TargetHeight $item.Height -DestinationPath $item.Dest
}
