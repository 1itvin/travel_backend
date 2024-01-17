import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {CreateTourDto} from "./dto/create-tour.dto";
import {UpdateTourDto} from "./dto/update-tour.dto";
import {ToursService} from "./tours.service";
import {Tour} from "./tours.model";

@ApiTags('Туры')
@Controller('tours')
export class ToursController {
    constructor(private readonly toursService: ToursService) {}

    @ApiOperation({ summary: 'Создать тур' })
    @ApiResponse({ status: 201, description: 'Тур успешно создан', type: Tour })
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async createTour(@Body() dto: CreateTourDto, @UploadedFile() image/*: Express.Multer.File*/) {
        return this.toursService.createTour(dto, image);
    }

    @ApiOperation({ summary: 'Получить все туры' })
    @ApiResponse({ status: 200, description: 'Туры успешно получены', type: Tour })
    @Get()
    async getAllTours(@Query('page') page: number, @Query('limit') limit: number) {
        return this.toursService.getAllTours(page, limit);
    }

    @ApiOperation({ summary: 'Получить тур по ID' })
    @ApiResponse({ status: 200, description: 'Тур успешно получен', type: Tour })
    @Get(':id')
    async getTourByID(@Param('id') id: number) {
        return this.toursService.getTourByID(id);
    }

    @ApiOperation({ summary: 'Обновить тур' })
    @ApiResponse({ status: 200, description: 'Тур успешно обновлен', type: Tour })
    @Put(':id')
    async updateTour(@Param('id') id: number, @Body() updateDto: UpdateTourDto) {
        return this.toursService.updateTour(id, updateDto);
    }

    @ApiOperation({ summary: 'Удалить тур' })
    @ApiResponse({ status: 200, description: 'Тур успешно удален' })
    @Delete(':id')
    async deleteTour(@Param('id') id: number) {
        return this.toursService.deleteTour(id);
    }
}